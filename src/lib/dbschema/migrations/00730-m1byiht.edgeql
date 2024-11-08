CREATE MIGRATION m1byihtxn5flusvk342vfqeinwals47lmo23btsaykarr33lts6lcq
    ONTO m1pomu7knmel6zgr4zbedaoc3uwg2ux7k7fmhzigpq2knsmwmvodqq
{
  ALTER TYPE app_cm::CmCohort {
      ALTER LINK cohortAttds {
          ON TARGET DELETE ALLOW;
      };
  };
};
