# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.



//




Name: Kane Kriz

Start Date: 17 April 2025

Last Edited: 4 May 2025

Feedback Request 1 Date: 4 May 2025




//


Feedback Request 2 Date: 5 May 2025


//




Response: 



The implementation's path reversal executes through three copy operations.

These operations are `newPath[j] = currentPath[j]` for the initial segment, `newPath[j] = currentPath[k - (j - i)]` for the reversed portion, and `newPath[j] = currentPath[j]` for the final segment. 

Each operation processes at most n cities, where n is the total number of cities, making each complete swap an $O(n)$ time operation.

When combined with the subsequent $O(n)$ distance calculation, this results in each iteration requiring $O(n)$ time in the worst case.

The memory complexity is determined by the $O(n)$ space required for the `currentPath` and `newPath` arrays.

Thus, the overall worst case asymptotic memory complexity is $O(n)$.



Each iteration takes $O(n)$ time because the path reversal performs `numCities` assignments through the implementation's copy operations `newPath[j] = currentPath[j]` and `newPath[j] = currentPath[k - (j - i)]`.

The distance calculaiton performs `numCities - 1` matrix accesses via `cityDistanceMatrix[newPath[j]][newPath[j+1]]`.

The fixed `maxTotalIterations` bound of 10,000 makes the total complexity bounded at $O(n)$.

These bounds of course can be altered / tweaked depending on the requirements of performance, test code, etc.

Random indexes are selected via `i = Math.floor(Math.random() * (numCities - 1))` and `k = i + 1 + Math.floor(Math.random() * (numCities - i - 1))`.

The randomization stops the algorithm from cycling through identical move sequences while maintaining 2 opt functionality.

Thus, the overall worst case asymptotic runtime complexity is $O(n)$ due to the fixed `maxTotalIterations` bound.




//


Plagiarism Acknowledgement: I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.


Citations:


Wikipedia Contributors. “2-Opt.” Wikipedia, Wikimedia Foundation, 13 Nov. 2019, en.wikipedia.org/wiki/2-opt.

Gazda, Matej. “TSP Algorithms: 2-Opt, 3-Opt in Python | Matej Gazda.” Matej Gazda, 8 Feb. 2019, matejgazda.com/tsp-algorithms-2-opt-3-opt-in-python/.

“2-Opt Explaind | TSP Optimization Tutorial and Visualization.” Www.youtube.com, www.youtube.com/watch?v=wsEzZ4F_bS4.

For helping with the implementation actually terminating, guidelines for end / repitition bounds: ---. “Local Search (Optimization).” Wikipedia, Wikimedia Foundation, 2 Aug. 2024, en.wikipedia.org/wiki/Local_search_(optimization)#Termination_conditions.
