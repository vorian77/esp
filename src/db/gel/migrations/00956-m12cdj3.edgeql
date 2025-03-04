CREATE MIGRATION m12cdj3aabsnvxaxsbwewxvjd5bcbuccvrkhy5wr4yhz5bj5sx3v5q
    ONTO m1jstcdn64p77vvx6si7tpd336pzirmoafv3hgjuftk35mobqnhbkq
{
  DROP FUNCTION default::average(values: array<std::float64>);
  DROP FUNCTION default::rate(num: std::float64, denom: std::float64);
};
