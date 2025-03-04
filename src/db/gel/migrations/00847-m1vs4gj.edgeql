CREATE MIGRATION m1vs4gj5ydublwwdlpwmvc22d3nrglkf3eennunqmsjgxz5ffp2dua
    ONTO m1mwsb5jkk56u6rpni4xgfpz2gzbivawskizfa3dx75dpqgc3xk6gq
{
  ALTER TYPE app_cm::CmPartner RENAME TO app_cm::CmPartnerOld;
};
