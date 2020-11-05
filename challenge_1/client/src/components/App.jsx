import React , {Component} from 'react';
import ReactPaginate from 'react-paginate';
import SearchForm from './SearchForm.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            term: '',
            offset: 0,
            limit: 10,
        };
    }

    handleChange(e) {
        this.setState({
            term: e.target.value,
        });
    }

    loadEvents() {
        fetch(`http://localhost:3000/events?q=${this.state.term}&_start=${this.state.offset}&_limit=${this.state.limit}`)
            .then(response => {
                console.log(response)
                // console.log(response.headers.get("X-Total-Count"))
                // const pages = response.headers.get("X-Total-Count");

                // this.setState({
                //     pageCount: Math.ceil(pages / this.state.limit),
                // });
                return response.json();
            })
            .then(data =>
                this.setState({
                    term: '',
                    data,
                }));
    }


    handleSubmit(e) {
        e.preventDefault();
        this.loadEvents();
    }

    handlePageClick(data) {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.limit);

        this.setState({ offset }, () => {
            this.loadEvents();
        });
    }

    render() {
        const data = this.state.data.map((obj, i) => (
            <ul key={i.toString()}>
                <li>date: {obj.date}</li>
                <li>description: {obj.description}</li>
                <li>category1: {obj.category1}</li>
                <li>category2: {obj.category2}</li>
                <li>granularity: {obj.granularity}</li>
            </ul>
        ))
        return (
            <div>
                <SearchForm handleSubmit={(e) => this.handleSubmit(e)} term={this.state.term} handleChange={(e) => this.handleChange(e)} />
                <div>{data}</div>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    // pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    onPageChange={(e) => this.handlePageClick(e)}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        );
    }
}

export default App;
