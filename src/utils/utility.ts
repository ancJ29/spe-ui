type TransformInputToUnion<T> = {
  [P in keyof T]: T[P];
}[keyof T];

type InstancePropsByType<T extends string, E> = {
  [P in T]: E
};

type InstanceClassesByType<T extends string, E> = {
  [k in T]: E
};
