CREATE MIGRATION m16c3xb5m4jiji7tpuhvzmgag3gcc63np27x4aaam3jzzdjekcylta
    ONTO m1c2wzdpybkzbwjfrpo3b5amj4xltev2ayupfadtyvab3svylg7yaa
{
          ALTER FUNCTION default::average(values: array<std::float64>) USING (SELECT
      (IF (std::len(values) = 0) THEN 0 ELSE (std::sum(std::array_unpack(values)) / std::len(values)))
  );
};
