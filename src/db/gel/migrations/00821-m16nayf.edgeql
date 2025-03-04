CREATE MIGRATION m16nayf3iqgpvxpf65nhcb6e2p7pvwepo5tb7lrsp6pczvrntkexvq
    ONTO m1uxwk7amkmu66hyigulipu72w2us2mmeqxxkbcn6wao4bzesrxp3q
{
          ALTER FUNCTION default::rate(num: std::float64, denom: std::float64) USING (SELECT
      (IF (denom = 0) THEN 0 ELSE std::round(4.5))
  );
};
