CREATE MIGRATION m1uxwk7amkmu66hyigulipu72w2us2mmeqxxkbcn6wao4bzesrxp3q
    ONTO m1c7wwsjcz7fb5c5c6d3vy6ymlzdpx2uh6ofyxfcqji7fv6pwwm2sa
{
          CREATE FUNCTION default::rate(num: std::float64, denom: std::float64) ->  std::float64 USING (SELECT
      (IF (denom = 0) THEN 0 ELSE (num / denom))
  );
};
