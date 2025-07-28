CREATE MIGRATION m1iwjtxw4i7rfdwe56nttgvxcw4igrihkiq46aa4jb35gaw7arlbmq
    ONTO m17bxzqkt7bqrazjtl7pxmlizhejkccywjyb5l3ia4zs2bq2jjl3ea
{
  ALTER TYPE app_cm::CmCsfEligibility {
      CREATE REQUIRED PROPERTY valueBoolean: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
