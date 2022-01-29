import React, { ReactNode } from 'react';

export type Resolver<IN> = (anyArg: IN) => boolean;
export type Rejector<IN, OUT> = (invalidArg: IN) => OUT;

export type AllReqProps<IN, OUT> = {
  With?: any[];
  Resolver?: Resolver<IN>;
  Rejector?: Rejector<IN, OUT>;
  Depth?: number;
  nodepth?: boolean;
  children?: ReactNode;
};

type ArrayObject<T> = {
  [i: number]: T;
};

const AllReq = function ({
  With = [],
  Resolver = (arg) => arg !== undefined,
  Rejector = () => '',
  Depth,
  nodepth,
  children,
}: AllReqProps<any, any>) {
  for (const anyArg of With) {
    if (!Resolver(anyArg)) {
      return Rejector(anyArg);
    }
  }
  if (nodepth || (Depth && Depth < 1)) return children;
  if (!Array.isArray(children) && !Resolver(children)) {
    return Rejector(children);
  }

  const stack: ArrayObject<ReactNode[]> = { 1: children as ReactNode[] };

  let currDepth = 1,
    nextDepth;

  while (stack[currDepth]) {
    nextDepth = currDepth + 1;
    for (const child of stack[currDepth]) {
      if (child === undefined) return Rejector(child);

      if (React.isValidElement(child)) {
        let props = child.props;
        if (props !== undefined) {
          for (const prop of props) {
            if (!Resolver(prop)) {
              return Rejector(prop);
            }
          }
        }
        let propsChildren = props.children;
        if (propsChildren !== undefined) {
          if (Array.isArray(propsChildren)) {
            if (stack[nextDepth]) {
              stack[nextDepth].push(...propsChildren);
            } else {
              stack[nextDepth] = propsChildren;
            }
          } else if (!Resolver(propsChildren)) {
            return Rejector(propsChildren);
          }
        }
      } else if (Array.isArray(child)) {
        if (stack[nextDepth]) {
          stack[nextDepth].push(...child);
        } else {
          stack[nextDepth] = child;
        }
      } else if (!Resolver(children)) {
        return Rejector(children);
      }
    }

    delete stack[currDepth];
    if (Depth && nextDepth > Depth) break;
    currDepth = nextDepth;
  }

  return children;
};

export default AllReq;
