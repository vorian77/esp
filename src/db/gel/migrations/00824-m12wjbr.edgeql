CREATE MIGRATION m12wjbrwnia6tvxyl76vcyewtaes3bayqbkmzqfxprxwawjhyjwl3q
    ONTO m1rgmkr3ugx65qxm2lt64uh5rhif62pv6ljpwanetckvlxpr4ifucq
{
          ALTER FUNCTION default::average(values: array<std::float64>) USING (SELECT
      (IF (std::len(values) = 0) THEN 0 ELSE default::rate(std::sum(std::array_unpack(values)), (std::len(values) * 100)))
  );
};
