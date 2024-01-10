// type NestedCondition = {
//   [key: string]: NestedCondition | { contains: string; mode: string }
// }

// type OrOptions = {
//   OR: NestedCondition[]
// }

// export function generateOrOptions(
//   fields: string[],
//   searchTerm: string,
// ): OrOptions {
//   return {
//     OR: fields.map(field => {
//       const fieldParts = field.split('.')

//       const condition: NestedCondition = {}
//       let current: NestedCondition = condition

//       for (let i = 0; i < fieldParts.length; i++) {
//         const part = fieldParts[i]
//         current[part] =
//           i === fieldParts.length - 1
//             ? { contains: searchTerm, mode: 'insensitive' }
//             : {}
//         current = current[part] as NestedCondition
//       }

//       return condition
//     }),
//   }
// }
