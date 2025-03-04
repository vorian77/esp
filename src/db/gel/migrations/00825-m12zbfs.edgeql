CREATE MIGRATION m12zbfs4j5wp2cg4eh2x5peen2drmapbpqzuvmgdtrlxa4m7q7juqa
    ONTO m12wjbrwnia6tvxyl76vcyewtaes3bayqbkmzqfxprxwawjhyjwl3q
{
          ALTER FUNCTION default::rate(num: std::float64, denom: std::float64) USING (SELECT
      (IF (denom = 0) THEN 0 ELSE (std::round(((num / denom) * 100)) / 100))
  );
  ALTER FUNCTION default::average(values: array<std::float64>) USING (SELECT
      (IF (std::len(values) = 0) THEN 0 ELSE default::rate(std::sum(std::array_unpack(values)), std::len(values)))
  );
};
