// @flow
import DumbSheetItem from './item'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import debounce from 'lodash/debounce'
import dumbComponentMap from './component-map.desktop'
import type {Props} from './render'
import {Box, Text, Input, BackButton} from '../../common-adapters'
import {globalStyles} from '../../styles'

class Render extends Component<void, Props, any> {
  _onFilterChange: (a: any) => void;

  constructor (props: Props) {
    super(props)

    this._onFilterChange = debounce(filter => {
      this.props.onDebugConfigChange({
        dumbFilter: filter,
      })
    }, 300)
  }

  componentDidMount () {
    // After all child components have loaded (and their autoFocuses, if present, have been triggered)
    // return focus back to the main filter field of the dumb sheet.
    ReactDOM.findDOMNode(this.refs.filterInput).querySelector('input').focus()
  }

  componentWillReceiveProps (nextProps: Props) {
    // FIXME: desktop <Input> element keeps internal state, need to set its value manually
    this.refs.filterInput.setValue(nextProps.dumbFilter)
  }

  render () {
    const parts = this.props.dumbFilter.toLowerCase().split(':')
    const filter = parts[0]
    let numItemsLeftWeCanShow = parseInt(parts[1], 10) || 10

    return (
      <Box style={{...globalStyles.scrollable, padding: 20}}>
        <BackButton onClick={this.props.onBack} />
        <Box style={{...globalStyles.flexBoxRow}}>
          <Text type='Header'>Filter:</Text>
          <Input
            ref='filterInput'
            value={filter}
            onChange={event => this._onFilterChange(event.target.value.toLowerCase())}
          />
        </Box>
        {Object.keys(dumbComponentMap).map(key => {
          const map = dumbComponentMap[key]
          const includeAllChildren = !filter || key.toLowerCase().indexOf(filter) !== -1
          const items = Object.keys(map.mocks)
            .filter(mockKey => !filter || includeAllChildren || (key.toLowerCase() + mockKey.toLowerCase()).indexOf(filter) !== -1)
            .map((mockKey, idx) => {
              --numItemsLeftWeCanShow

              if (numItemsLeftWeCanShow < 0) return null

              return (
                <DumbSheetItem
                  key={mockKey}
                  component={map.component}
                  mockKey={mockKey}
                  mock={map.mocks[mockKey]}
                />
              )
            })

          if (!items.length) {
            return null
          }

          return (
            <Box key={key} style={styleBox}>
              <Text type='Header' style={{marginBottom: 5}} onClick={() => this._onFilterChange(key)}>{key}</Text>
              {items}
            </Box>
          )
        })}
      </Box>
    )
  }
}

export const styleBox = {
  ...globalStyles.flexBoxColumn,
  padding: 20,
  marginTop: 10,
  border: 'solid 1px lightgray',
  boxShadow: '5px 5px lightgray',
}

export default Render
