// RootNavigation.js

import { NavigationContainerRef, StackActions } from '@react-navigation/native'
import * as React from 'react'

const navigationRef = React.createRef<NavigationContainerRef>()

export function navigate(name: any, params: any) {
  navigationRef.current?.navigate(name, params)
}

export function push(...args: any) {
  // @ts-ignore
  navigationRef.current?.dispatch(StackActions.push(...args))
}

// add other navigation functions that you need and export them
