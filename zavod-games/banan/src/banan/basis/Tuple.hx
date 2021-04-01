package banan.basis;

typedef Tuple2<T1, T2> = {
    a: T1,
    b: T2
};

typedef Tuple3<T1, T2, T3> = {
    a: T1,
    b: T2,
    c: T3
};

class Tuple {

    public static inline function of2<T1, T2>(v1: T1, v2: T2): Tuple2<T1, T2> return {a: v1, b: v2};

    public static inline function of3<T1, T2, T3>(v1: T1, v2: T2, v3: T3): Tuple3<T1, T2, T3> return {a: v1, b: v2, c: v3};
}