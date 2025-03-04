CREATE MIGRATION m1rgmkr3ugx65qxm2lt64uh5rhif62pv6ljpwanetckvlxpr4ifucq
    ONTO m1hxrzi5fwlgw3f54rzm7wcrdsdjzydp3gfdeqef2dr7tsy4naxa6a
{
          ALTER FUNCTION default::average(values: array<std::float64>) USING (SELECT
      (IF (std::len(values) = 0) THEN 0 ELSE default::rate(std::sum(std::array_unpack(values)), std::len(values)))
  );
};
