// @flow
import React, {Component} from 'react'
import {Button, Input, PlatformIcon, SmallInput, StandardScreen, Text} from '../../common-adapters'
import {NativeKeyboardAvoidingView} from '../../common-adapters/index.native'
import {globalMargins, globalColors} from '../../styles'
import type {Props} from './add'

class PgpAdd extends Component<void, Props, void> {
  render () {
    const nextDisabled = !this.props.email1 || !this.props.fullName
    const emailInputProps = {
      style: styleEmailInput,
      autoCapitalize: 'none',
    }
    return (
      <NativeKeyboardAvoidingView behavior='position'>
        <StandardScreen
          style={styleContainer}
          onClose={this.props.onCancel}>
          {/* TODO(MM) when we get the pgp icon, put it in here */}
          <PlatformIcon
            platform='pgp'
            overlay='icon-proof-unfinished'
            style={styleIcon} />
          <Text
            style={styleHeader}
            type='Header'>
            Fill in your public info
          </Text>
          <Input
            floatingLabelText='Your full name'
            hintText='Your full name'
            value={this.props.fullName}
            onChangeText={this.props.onChangeFullName}
            textStyle={{height: undefined}} />
          <SmallInput
            {...emailInputProps}
            label='Email 1:'
            hintText='(required)'
            onChange={this.props.onChangeEmail1}
            value={this.props.email1}
            errorState={this.props.errorEmail1} />
          <SmallInput
            {...emailInputProps}
            label='Email 2:'
            hintText='(optional)'
            onChange={this.props.onChangeEmail2}
            value={this.props.email2}
            errorState={this.props.errorEmail2} />
          <SmallInput
            {...emailInputProps}
            label='Email 3:'
            hintText='(optional)'
            onChange={this.props.onChangeEmail3}
            value={this.props.email3}
            errorState={this.props.errorEmail3} />
          <Text
            style={styleInfoMessage(!!this.props.errorText)}
            type='BodySmall'>
            {this.props.errorText || 'Include any addresses you plan to use for PGP encrypted email.'}
          </Text>
          <Button
            style={styleAction}
            type='Primary'
            label='Let the math begin'
            disabled={nextDisabled}
            onClick={this.props.onNext} />
        </StandardScreen>
      </NativeKeyboardAvoidingView>
    )
  }
}

const styleContainer = {
}

const styleIcon = {
  alignSelf: 'center',
}

const styleHeader = {
  marginTop: globalMargins.medium,
  alignSelf: 'center',
}

const styleEmailInput = {
  marginTop: globalMargins.small,
}

const styleInfoMessage = (errorText: boolean) => ({
  marginTop: globalMargins.small,
  textAlign: 'center',
  ...(errorText ? {color: globalColors.red} : {}),
})

const styleAction = {
  marginTop: globalMargins.small + globalMargins.tiny,
}

export default PgpAdd
