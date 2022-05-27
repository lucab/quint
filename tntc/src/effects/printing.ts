/* ----------------------------------------------------------------------------------
 * Copyright (c) Informal Systems 2022. All rights reserved.
 * Licensed under the Apache 2.0.
 * See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------- */

/**
 * Pretty printing for Effects.
 *
 * @author Gabriela Moreira
 *
 * @module
 */

import { Effect, Variables } from './base'

/**
 * Pretty prints an effect
 *
 * @param e the effect to be formatted
 *
 * @returns a string with the pretty printed effect
 */
export function effectToString (e: Effect): string {
  switch (e.kind) {
    case 'var': return e.name
    case 'concrete': {
      const output = []
      if (e.read.kind !== 'concrete' || e.read.vars.length > 0) {
        output.push(`Read[${variablesToString(e.read)}]`)
      }
      if (e.update.kind !== 'concrete' || e.update.vars.length > 0) {
        output.push(`Update[${variablesToString(e.update)}]`)
      }
      if (output.length > 0) {
        return output.join(' & ')
      } else {
        return 'Pure'
      }
    }
    case 'arrow': {
      const effects = e.effects.map(effectToString)
      const result = effects.pop()
      return `(${effects.join(', ')}) => ${result}`
    }
  }
}

/**
 * Pretty prints effect variables
 *
 * @param v the Variables instance to be formatted
 *
 * @returns a string with the pretty printed variables
 */
export function variablesToString (v: Variables): string {
  switch (v.kind) {
    case 'concrete': return v.vars.map(v => `'${v}'`).join(', ')
    case 'quantification': return v.name
    case 'union': return v.variables.map(variablesToString).join(', ')
  }
}
