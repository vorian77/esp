CREATE MIGRATION m1hxrzi5fwlgw3f54rzm7wcrdsdjzydp3gfdeqef2dr7tsy4naxa6a
    ONTO m16nayf3iqgpvxpf65nhcb6e2p7pvwepo5tb7lrsp6pczvrntkexvq
{
          ALTER FUNCTION default::rate(num: std::float64, denom: std::float64) USING (SELECT
      (IF (denom = 0) THEN 0 ELSE std::round(((num / denom) * 100)))
  );
};
