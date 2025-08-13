CREATE MIGRATION m1ct4xrfhrptqazcjozhfkc6iwru5gvsfnmfe35msrqwerhtbxuowq
    ONTO m16xacrud2h3gbem5bukr5pcrttkjk7hhja27isospw7n3pynk66wq
{
  ALTER TYPE app_cm::CmCsfEligibility {
      ALTER LINK csf {
          ON TARGET DELETE DELETE SOURCE;
          SET OWNED;
          SET REQUIRED;
          SET TYPE app_cm::CmClientServiceFlow;
      };
  };
};
