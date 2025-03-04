CREATE MIGRATION m1kwxdnli5bdvrcgtw2vdwxzsscqeco7uqgpl7qkwv723i67of7dla
    ONTO m1heqkkqjruz7mocpzi7i7inlv6na4nakulqbxgb52crofuh7u2t5a
{
              ALTER TYPE app_cm::CmCohort {
      ALTER LINK course {
          USING (std::assert_single(.<cohorts[IS app_cm::CmCourse]));
      };
  };
};
