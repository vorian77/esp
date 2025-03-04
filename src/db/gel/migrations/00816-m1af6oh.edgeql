CREATE MIGRATION m1af6ohv2nzgss4jbjvv75sovbbcn62fm2ajyw3hhzcczxn6a5izba
    ONTO m1vhs25kyot4mw2hqvtl3wnmsd42xewtaiu4m2qt2timlyznep3gaq
{
          ALTER FUNCTION default::average(values: array<std::float64>) USING (SELECT
      (IF (std::len(values) = 0) THEN 0 ELSE std::len(values))
  );
};
