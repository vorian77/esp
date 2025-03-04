CREATE MIGRATION m1c2wzdpybkzbwjfrpo3b5amj4xltev2ayupfadtyvab3svylg7yaa
    ONTO m1af6ohv2nzgss4jbjvv75sovbbcn62fm2ajyw3hhzcczxn6a5izba
{
          ALTER FUNCTION default::average(values: array<std::float64>) USING (SELECT
      (IF (std::len(values) = 0) THEN 0 ELSE std::sum(std::array_unpack(values)))
  );
};
