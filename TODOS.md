# TODOS

- there must be at least 2 symbols (with its rules) defined in a real game, to have different outcomes i.e. a winner/loser or a tie
- add outcome decorator to transform an outcome into a human readable message e.g. 0 => 'tie', 1 => 'A has beaten B'
- extend rules structure to define beatable symbols with a corresponding winning message
- extract symbol factory to its own modules along with unit tests
- split rules validator into rules definition and symbol definiton validators
- use symbol definition validator in symbol factory
- use symbol objects as input in symbol comparator function
