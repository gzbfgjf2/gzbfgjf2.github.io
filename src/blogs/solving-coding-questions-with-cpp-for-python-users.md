---
title: "Simple Coding Question C++ for Python Users"
date: "24-03-2024"
---

# variable

```cpp
// type name = value;
// type name1 = value1;  name2 = value2; to save space;
ListNode* head=node1; tail=node2;
```

For more information about initialisation, see this
[blog](https://herbsutter.com/2013/05/09/gotw-1-solution/).

<!-- - default -->
<!-- - direct -->
<!-- - copy -->
<!-- - uniform (list) -->
<!-- - aggregate -->
<!-- - Designated Initializers -->

# list

```python
arr = [myfunc(x) for x in arr]
```

```cpp
vector<T> array = std::transform(arr.begin(), arr.end(), target.begin(), myfunc);
```

# macros

Using macros in C++ can shorten the code.

```cpp
#define FORLOOP(start, end, increment) \
  for (int i = (start); i < (end); i += (increment))

FORLOOP(0, 10, 1) cout<<i<<endl;
```
