import {FC} from 'react'
import classNames from 'classnames'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {Col, Grid, Row} from 'rsuite'


const Btn = styled.a`
    display: block;
    width: 100%;
    height: 32px;
    line-height: 32px;
    margin-top: 4px;
    margin-bottom: 8px;
    border-radius: 16px;
    background-color: #2B2D2F; // TODO: color
    box-shadow: inset 0 0 0 2px #3F4045; // TODO: color
    color: #606060; // TODO: color
    text-align: center;
    text-overflow: ellipsis;
    word-break: break-all;
    font-size: 16px;
    overflow: hidden;
    transition: all 0.2s ease;

    &:hover {
        color: #FFFFFF; // TODO: color
    }

    &.--active {
        background-color: #3F4045; // TODO: color
        box-shadow: inset 0 0 0 2px #2B2D2F; // TODO: color
        color: #FFFFFF; // TODO: color
    }
`


interface CategoryGridProps {
    categories: string[]
    selectedCategory: string
    onSelectCategory: (category: string) => void
}


const CategoryGrid: FC<CategoryGridProps> = observer(props => (
    <Grid fluid>
        <Row>
            {props.categories.map((category, index) => (
                <Col xs={6} key={index}>
                    <Btn
                        className={classNames({'--active': category === props.selectedCategory})}
                        onClick={() => props.onSelectCategory(category)}>
                        {category}
                    </Btn>
                </Col>
            ))}
        </Row>
    </Grid>
))


export default CategoryGrid
