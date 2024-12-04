## Understanding TypeScript utility types

Utility types are predefined, generic types in TypeScript that make the transformation of existing types into new variant types possible. They can be thought of as type-level functions that take existing types as parameters and return new types based on certain rules of transformation.

This is particularly useful when working with interfaces, where modified variants of types already in existence are often required without actually needing to duplicate the type definitions.

**Utility types:**

1. Partial[](#partial)
2. Required[](#required)
3. Readonly[](#readonly)
4. Pick[](#picktype-keys)
5. Omit[](#omittype-keys)
6. Record[](#recordkeys-type)
7. Exclude[](#excludetype-excludedunion)
8. Extract[](#extracttype-union)
9. NonNullable[](#nonnullable)
10. ReturnType[](#returntype)
11. Parameters[](#parameters)

**Advanced use cases:**

## Utility types

### Partial

The `Partial<Type>` utility type takes a type and make all its properties optional.

e.g: When creating user profile update function, if the user does not want to update all the fields, then use Partial and update the required field only:

```ts
interface User {
    id: number;
    name: string
}

function updateUser (user: Partial<User>) {
    console.log(Updating user: ${user.name})
}
```

### Required

The `Required<Type>` utility type constructs a type with all properties of the provided type set to required. This ensure that all properties are available.

e.g:

```ts
interface Car {
  make: string;
  model: string;
  mileage?: number;
}

const myCar: Required<Car> = {
  make: 'Ford',
  model: 'Focus',
  mileage: 12000,
};
```

### Readonly

The `Readonly<Type>` utility type creates a type where all properties are read-only. This is useful when protect the critical settings from unwanted changes.

e.g:

```ts
interface Config {
  apiEndpoint: string;
}

const config: Readonly<Config> = {
  apiEndpoint: 'https://api.example.com',
};
```

### Pick<Type, Keys>

`Pick<Type, Keys>` utility type constructs a type by picking a set of properties from a type. You might need this to filter essential information.

e.g:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserSummary = Pick<User, 'name' | 'email'>;

const userSummary: UserSummary = {
  name: 'Your name',
  email: 'mail@example.com',
};
```

### Omit<Type, Keys>

`Omit<Type, Keys>` utility type constructs a type by excluding specific properties from a type. You don't want to share data with third party with sensitive information, **boom**, `Omit` it

e.g:

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

const userWithoutEmail: Omit<User, 'email'> = {
  id: 1,
  name: 'Bob',
};
```

### Record<Keys, Type>

`Record<Keys, Type>` utility type creates an object type with specified keys and values, which is useful when dealing with structured mappings.

For example, in the context of inventory management systems, the `Record` type can be useful in making explicit mappings between items and quantities. With this type of structure, the inventory data can be easily accessed and modified while ensuring that all fruits expected are accounted for.

e.g:

```ts
type Fruit = 'apple' | 'banana' | 'orange';
type Inventory = Record<Fruit, number>;

const inventory: Inventory = {
  apple: 10,
  banana: 5,
  orange: 0,
};
```

### Exclude<Type, ExcludedUnion>

The `Exclude<Type, ExcludedUnion>` utility type constructs a type by excluding specific types from a union.

You can use `Exclude` when designing functions that should only accept certain primitive types (e.g., numbers or Booleans but not strings). This can prevent bugs where unexpected types might cause errors during execution.

e.g:

```ts
type Primitive = string | number | boolean;

const value: Exclude<Primitive, string> = true; // Only allows number or boolean.
```

### Extract<Type, Union>

The `Extract<Type, Union>` utility type constructs a type by extracting specific types from a union.

In scenarios where you need to process only numeric values from a mixed-type collection (like performing calculations), using `Extract` ensures that only numbers are passed through. This is useful in data processing pipelines where strict typing can prevent runtime errors.

e.g:

```ts
type Primitive = string | number | boolean;

const value2: Extract<Primitive, number> = 42; // Only allows numbers.
```

### NonNullable

The `NonNullable<Type>` utility type constructs a type by excluding null and undefined from the given type.

In apps where some values need to be defined at all times, such as usernames or product IDs, making them `NonNullable` will ensure that such key fields will never be null or undefined. It is useful during form validations and responses from APIs where missing values would likely cause problems.

e.g:

```ts
type NullableString = string | null | undefined;

const value3: NonNullable<NullableString> = 'Hello'; // null and undefined are not allowed.
```

### ReturnType

The `ReturnType<Type>` utility extracts the return type of a function.

When working with higher-order functions or callbacks returning complex objects, such as coordinates, using `ReturnType` simplifies defining the expected return types without needing to state them manually each time. This can speed up development by reducing mismatched types-related bugs.

e.g:

```ts
type PointGenerator = () => { x: number; y: number };

const point: ReturnType<PointGenerator> = {
  x: 10,
  y: 20,
};
```

### Parameters

The `Parameters<Type>` utility extracts the parameter types of a function as a tuple.

This allows easy extraction and reuse of the parameter types in situations where one wants to manipulate or validate function parameters dynamically, such as when writing wrappers around functions. It greatly increases code reusability and maintainability across your codebase by ensuring consistency of function signatures.

e.g:

```ts
function createUser(name: string, age: number): User {
  return { name, age };
}

type CreateUserParams = Parameters<typeof createUser>;
```

## Advanced use cases

### Partial and Required

You can create a type that requires certain fields while allowing others to be optional.

e.g:

```ts
interface User {
  id: number;
  name?: string;
  email?: string;
}

// Combining Partial and Required
type UpdateUser = Required<Pick<User, 'id'>> & Partial<Omit<User, 'id'>>;

const updateUserData: UpdateUser = { id: 1, name: 'Alice' }; // Valid
```

In this example, `UpdateUser` requires the `id` property while allowing name and email to be optional. This pattern is useful for updating records where the identifier must always be present.

### Creating flexible API responses

You might want to define API responses that can have different shapes based on certain conditions.

e.g:

```ts
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Using Record with Omit for flexible responses
type UserResponse = ApiResponse<Pick<User, 'name' | 'email'>>;

const response1: UserResponse = { data: { name: 'Alice', email: 'alice@example.com' } };
const response2: UserResponse = { error: 'User not found' };
```

Here, `ApiResponse` allows you to create flexible response types for an API call. By using `Pick`, you ensure that only relevant user data is included in the response.

### Combining Exclude and Extract for filtering types

You might encounter situations where you need to filter out specific types from a union based on certain criteria.

e.g:

```ts
type ResponseTypes = 'success' | 'error' | 'loading';

// Extracting specific response types while excluding others
type NonLoadingResponses = Exclude<ResponseTypes, 'loading'>;

const handleResponse = (responseType: NonLoadingResponses) => {
  if (responseType === 'success') {
    console.log('Operation was successful!');
  } else if (responseType === 'error') {
    console.log('An error occurred.');
  }
};

handleResponse('success'); // Valid call
// handleResponse('loading'); // Error as loading is excluded
```

Here, the `Exclude` utility is used to create a type (`NonLoadingResponses`) that excludes `loading` from the original `ResponseTypes` union, allowing the `handleResponse` function to accept only `success` or `error` as valid inputs.

## Best practices

### Use only necessary

While utility types are incredibly powerful, overusing them can lead to complex and unreadable code. It’s essential to strike a balance between leveraging these utilities and maintaining code clarity.

e.g:

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};

// Overly complex type using multiple utilities.
type ComplexUser = Partial<Required<Pick<User, 'name' | 'email'>>>;

// This can be confusing and hard to maintain.
const user1: ComplexUser = { name: 'Alice' }; // Valid, but unclear intent
```

### Maintain clarity

Ensure that the purpose of each utility use case is clear. Avoid nesting too many utilities together, as it can confuse the intended structure of your types.

e.g:

```ts
type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
};

// Clear and understandable use of utility types.
type ProductPreview = Pick<Product, 'id' | 'name'>;

const preview: ProductPreview = {
  id: 101,
  name: 'Smartphone',
};
```

### Performance considerations

While performance impacts are rare at runtime since TypeScript types disappear after compilation, complex types can slow down the TypeScript compiler, affecting development speed.

e.g:

```ts
// A complex type that could impact performance if used excessively.
type DeeplyNestedType = {
  level1: {
    level2: {
      level3: {
        level4: {
          level5: string;
        };
      };
    };
  };
};

// Accessing deeply nested properties can lead to performance issues
const example: DeeplyNestedType = {
  level1: {
    level2: {
      level3: {
        level4: {
          level5: 'Hello',
        },
      },
    },
  },
};

console.log(example.level1.level2.level3.level4.level5); // Performance hit on deep access
```
