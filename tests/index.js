var req     = require('rekuire'),
    project = req('project'),

    assert  = require('assert'),
    range   = require(project.sources.range);

function equalArray(actual, expected) {
    if (actual.length !== expected.length) {
        return false;
    }

    for (var i = 0, len = expected.length; i < len; ++i) {
        if (expected[i] !== actual[i]) {
            return false;
        }
    }

    return true;
}

var defaults = {
    array  : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
};

module.exports = {
    'range' : {
        'default cases' : {
            'range()' : {
                'should return [0, 10)' : function() {
                    assert(equalArray(range(), defaults.array));
                }
            },
            'range(0)' : {
                'should return []' : function() {
                    assert(equalArray(range(0), []));
                }
            }
        },
        'general cases' : {
            'range(len)' : {
                'should return [0, len)' : function() {
                    assert(equalArray(range(1), [0]));
                    assert(equalArray(range(5), [0, 1, 2, 3, 4]));
                }
            },
            'range(start, end)' : {
                'should return [start, end)' : function() {
                    assert(equalArray(range(0, 1),  [0]));
                    assert(equalArray(range(0, -1), [0]));
                    assert(equalArray(range(1, -1), [1, 0]));
                    assert(equalArray(range(0, 5),  [0, 1, 2, 3, 4]));
                    assert(equalArray(range(-5, 5), [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]));
                    assert(equalArray(range(5, -5), [5, 4, 3, 2, 1, 0, -1, -2, -3, -4]));
                }
            },
            'range(start, end, step)' : {
                'should return [start, end) by step' : function() {
                    assert(equalArray(range(0, 1, 1),  [0]));
                    assert(equalArray(range(0, 1, 2),  [0]));
                    assert(equalArray(range(-1, 1, 2), [-1]));
                    assert(equalArray(range(0, 5, 2),  [0, 2, 4]));
                    assert(equalArray(range(-5, 5, 3), [-5, -2, 1, 4]));
                    assert(equalArray(range(5, -5, 3), [5, 2, -1, -4]));
                }
            },
            'range(start, end, step, includeStart)' : {
                'should return [start, end) by step, includeStart = true' : function() {
                    assert(equalArray(range(0, 1, 1, true),  [0]));
                    assert(equalArray(range(0, 1, 2, true),  [0]));
                    assert(equalArray(range(-1, 1, 2, true), [-1]));
                    assert(equalArray(range(0, 5, 2, true),  [0, 2, 4]));
                    assert(equalArray(range(-5, 5, 3, true), [-5, -2, 1, 4]));
                    assert(equalArray(range(5, -5, 3, true), [5, 2, -1, -4]));
                },
                'should return [start, end) by step, includeStart = false' : function() {
                    assert(equalArray(range(0, 1, 1, false),  []));
                    assert(equalArray(range(0, 1, 2, false),  []));
                    assert(equalArray(range(-1, 1, 2, false), []));
                    assert(equalArray(range(0, 5, 2, false),  [2]));
                    assert(equalArray(range(-5, 5, 3, false), [-2, 1]));
                    assert(equalArray(range(5, -5, 3, false), [2, -1]));
                }
            },
            'range(start, end, step, includeStart, includeEnd)' : {
                'should return [start, end) by step, includeStart = true, includeEnd = false' : function() {
                    assert(equalArray(range(0, 1, 1, true, false),  [0]));
                    assert(equalArray(range(0, 1, 2, true, false),  [0]));
                    assert(equalArray(range(-1, 1, 2, true, false), [-1]));
                    assert(equalArray(range(0, 5, 2, true, false),  [0, 2, 4]));
                    assert(equalArray(range(-5, 5, 3, true, false), [-5, -2, 1, 4]));
                    assert(equalArray(range(5, -5, 3, true, false), [5, 2, -1, -4]));
                },
                'should return [start, end) by step, includeStart = true, includeEnd = true' : function() {
                    assert(equalArray(range(0, 1, 1, true, true),  [0, 1]));
                    assert(equalArray(range(0, 1, 2, true, true),  [0]));
                    assert(equalArray(range(-1, 1, 2, true, true), [-1, 1]));
                    assert(equalArray(range(0, 6, 2, true, true),  [0, 2, 4, 6]));
                    assert(equalArray(range(-5, 7, 3, true, true), [-5, -2, 1, 4, 7]));
                    assert(equalArray(range(5, -7, 3, true, true), [5, 2, -1, -4, -7]));
                },
                'should return [start, end) by step, includeStart = false, includeEnd = false' : function() {
                    assert(equalArray(range(0, 1, 1, false, false),  []));
                    assert(equalArray(range(0, 1, 2, false, false),  []));
                    assert(equalArray(range(-1, 1, 2, false, false), []));
                    assert(equalArray(range(0, 5, 2, false, false),  [2]));
                    assert(equalArray(range(-5, 5, 3, false, false), [-2, 1]));
                    assert(equalArray(range(5, -5, 3, false, false), [2, -1]));
                },
                'should return [start, end) by step, includeStart = false, includeEnd = true' : function() {
                    assert(equalArray(range(0, 1, 1, false, true),  [1]));
                    assert(equalArray(range(0, 1, 2, false, true),  []));
                    assert(equalArray(range(-1, 1, 2, false, true), [1]));
                    assert(equalArray(range(0, 5, 2, false, true),  [2, 4]));
                    assert(equalArray(range(-5, 5, 3, false, true), [-2, 1, 4]));
                    assert(equalArray(range(5, -5, 3, false, true), [2, -1, -4]));
                }
            }
        },
        'edge cases' : {
            'range() called with invalid type/number of arguments' : {
                'should return [0, 10)' : function() {
                    assert(equalArray(range([]), defaults.array));
                    assert(equalArray(range({}), defaults.array));
                    assert(equalArray(range(true), defaults.array));
                    assert(equalArray(range(null), defaults.array));
                    assert(equalArray(range(undefined), defaults.array));
                    assert(equalArray(range(0, 10, null, null, null), defaults.array));
                    assert(equalArray(range(10, null, null, null, null), defaults.array));
                }
            },
            'range() called with arguments suspect to cause infinite loops' : {
                'should return []' : function() {
                    assert(equalArray(range(0, 10, -1), []));
                    assert(equalArray(range(10, 0, -1), []));
                }
            },
            'range(-len)' : {
                'should return [0, -len)' : function() {
                    assert(equalArray(range(-1), [0]));
                    assert(equalArray(range(-5), [0, -1, -2, -3, -4]));
                }
            },
            'range(1, 1)' : {
                'should return []' : function() {
                    assert(equalArray(range(1, 1), []));
                }
            },
            'range(1, 1, 1)' : {
                'should return []' : function() {
                    assert(equalArray(range(1, 1, 1), []));
                }
            },
            'range(0, 10, -10)' : {
                'should return []' : function() {
                    assert(equalArray(range(0, 10, -10), []));
                }
            }
        }
    }
};
