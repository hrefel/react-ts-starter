import React, { Fragment } from "react";
// import "./autocomplete.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

interface PropsAutocomplete {
  suggestions?: string[];
}

interface AutocompleteState {
  itemsSuggestion: any;
}

export default class Autocomplete extends React.Component<
  PropsAutocomplete,
  AutocompleteState
> {
  constructor(props: PropsAutocomplete) {
    super(props);
    this.state = {
      itemsSuggestion: []
    }
    
  }

  componentDidMount() {
    this.setState({
      itemsSuggestion: [
        {
          id: 0,
          name: "Cobol",
        },
        {
          id: 1,
          name: "JavaScript",
        },
        {
          id: 2,
          name: "Basic",
        },
        {
          id: 3,
          name: "PHP",
        },
        {
          id: 4,
          name: "Java",
        },
      ],
    });
  }

  handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  handleOnFocus = () => {
    console.log("Focused");
  };

  formatResult = (item) => {
    console.log(item);
    return item;
    // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  };

  render(): React.ReactNode {
    return (
      <Fragment>
        <ReactSearchAutocomplete
          items={this.state.itemsSuggestion}
          onSearch={this.handleOnSearch}
          onHover={this.handleOnHover}
          onSelect={this.handleOnSelect}
          onFocus={this.handleOnFocus}
          autoFocus
          formatResult={this.formatResult}
        />
      </Fragment>
    );
  }
}
