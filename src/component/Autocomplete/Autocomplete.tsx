import React, { Fragment } from "react";
import './autocomplete.css';
interface PropsAutocomplete {
  suggestions: string[];
}

interface AutocompleteState {
  activeSuggestion: any;
  filteredSuggestions: any;
  showSuggestions: boolean;
  userInput: string;
}

export default class Autocomplete extends React.Component<
  PropsAutocomplete,
  AutocompleteState
> {
  constructor(props: PropsAutocomplete) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
    };

    this.onChangeHandler.bind(this);
    this.onClick.bind(this);
    this.onKeyDown.bind(this);
  }

  onChangeHandler = (e: any) => {
      console.log('onchange');
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter((suggestion: any) => {
      suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
    });

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  onClick = (e: any) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  onKeyDown = (e: any) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) return;
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) return;
    }
    this.setState({ activeSuggestion: activeSuggestion + 1 });
  };

  render(): React.ReactNode {
    const {
      onChangeHandler,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion: any, index: number) => {
              let className;

              if (index === activeSuggestion) {
                className = "sugesstion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No sugesstion available</em>
        </div>
      );
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChangeHandler}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}
