// @flow
import React from 'react'
import {BackButton, Box, Text, Icon} from '../common-adapters'
import {globalStyles, globalColors, globalMargins} from '../styles'
import type {Props, NotificationType} from './standard-screen'

const StandardScreen = (props: Props) => {
  const topStack = [
    !!props.onBack && <BackButton key='back' onClick={props.onBack} style={{...styleBack, ...props.styleBack}} />,
    !!props.notification && (<Box key='banner' style={{...styleBanner(props.notification.type), ...props.styleBanner}}>
      {typeof props.notification.message === 'string'
        ? <Text style={styleBannerText} type='BodySmallSemibold'>{props.notification.message}</Text>
        : props.notification.message
      }
    </Box>),
  ]
  const topStackCount = topStack.reduce((acc, x) => acc + !!x, 0)
  return (
    <Box style={{...styleContainer, ...props.styleOuter}}>
      <Box style={styleTopStack}>
        {topStack}
      </Box>
      <Box style={{...styleInnerContainer, paddingBottom: topStackCount * globalMargins.large}}>
        {!!props.onClose && <Icon style={{...styleClose, ...props.styleClose}} type='iconfont-close' onClick={props.onClose} />}
        <Box style={{...styleContentContainer, ...props.style}}>
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}

const styleContainer = {
  ...globalStyles.flexBoxColumn,
  ...globalStyles.scrollable,
  flex: 1,
  alignItems: 'stretch',
  position: 'relative',
}

const styleTopStack = {
  ...globalStyles.flexBoxColumn,
  position: 'relative',
  alignItems: 'stretch',
  width: '100%',
}

const styleClose = {
  ...globalStyles.clickable,
  position: 'absolute',
  top: globalMargins.small,
  right: globalMargins.small,
  color: globalColors.black_10,
}

const styleBack = {
  ...globalStyles.clickable,
  height: globalMargins.large,
  alignSelf: 'flex-start',
  marginLeft: globalMargins.small,
}

const styleBanner = (notificationType: NotificationType) => ({
  ...globalStyles.flexBoxColumn,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  zIndex: 1,
  height: globalMargins.large,
  backgroundColor: notificationType === 'error'
    ? globalColors.red
    : globalColors.green,
})

const styleBannerText = {
  color: globalColors.white,
}

const styleInnerContainer = {
  ...globalStyles.flexBoxColumn,
  flex: 1,
  alignItems: 'center',
  position: 'relative',
}

const styleContentContainer = {
  ...globalStyles.flexBoxColumn,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  margin: globalMargins.large,
  textAlign: 'center',
}

export default StandardScreen
