import {FC} from "react";
import {Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import KeySearchByCategoryPage from "./search/search-by-category";
import KeySearchByKeyboardPage from "./search/search-by-keyboard";
import KeySearchByTextPage from "./search/search-by-text";

const ProgramMainPage: FC = props => {
    const match = useRouteMatch();
    const { programCode } = useParams<{ programCode: string}>()
    return <>
        <Switch>
            <Route path={match.url} exact>
                {programCode} 프로그램 상세
                <ul>
                    <li><Link to={`${match.url}/search/keyboard`}>Keyboard</Link></li>
                    <li><Link to={`${match.url}/search/category`}>Category</Link></li>
                    <li><Link to={`${match.url}/search/text`}>Text</Link></li>
                </ul>
            </Route>
            <Route path={`${match.url}/search/category`}><KeySearchByCategoryPage/></Route>
            <Route path={`${match.url}/search/keyboard`}><KeySearchByKeyboardPage/></Route>
            <Route path={`${match.url}/search/text`}><KeySearchByTextPage/></Route>
        </Switch>
    </>
}

export default ProgramMainPage
