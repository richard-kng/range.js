macro isPassed {
    rule {
        ($object)
    } => {
        $object !== null && typeof $object !== 'undefined'
    }
}

macro isNumber {
    rule {
        ($object)
    } => {
        typeof $object === 'number'
            && $object === $object
            && $object > -Infinity
            && $object < Infinity
    }
}

macro asNumber {
    rule {
        ($parameter, $defaultValue)
    } => {
        typeof $parameter === 'number'
            && $parameter === $parameter
            && $parameter > -Infinity
            && $parameter < Infinity

                ? $parameter
                : $defaultValue
    }
}

macro asBoolean {
    rule {
        ($parameter, $defaultValue)
    } => {
        typeof $parameter === 'boolean' ? $parameter : $defaultValue
    }
}
