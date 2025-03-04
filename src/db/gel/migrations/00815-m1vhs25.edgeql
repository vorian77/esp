CREATE MIGRATION m1vhs25kyot4mw2hqvtl3wnmsd42xewtaiu4m2qt2timlyznep3gaq
    ONTO m1mb7zc4flran4nzjjltjk6hkafjt6f5nnvf2z64x33l3m2jukoa5q
{
          CREATE FUNCTION default::average(values: array<std::float64>) ->  std::float64 USING (SELECT
      0
  );
};
