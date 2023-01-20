# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I read through the current code and decipher what was there and made tests for each condition and use case that I can think of. Once I got all the tests to pass, the first thing I wanted to refactor was to consolidate any redundant functionality into a separate function. In this case, was the `crypto.createhash`. Next, I noticed there were a lot of conditional statement and I love the anti-if pattern. So I removed the nested conditionals, and extracted what I can into a separate function. Lastly, I replaced the mutable variable with an immutable variable.