CREATE MIGRATION m1hwzdrptoelbpjsrpyxf26eqaxxncisgj7wekio3ednz7bzzkjj3q
    ONTO m1wpf3mq7jc4n6b5mmsnjo6tk33udatpyova5anqj4cxixkn255tqq
{
  ALTER TYPE app_cm::CmCohortAttd {
      CREATE LINK file: default::SysFile;
  };
  ALTER TYPE app_cm::CmCsfDocument {
      CREATE LINK file: default::SysFile;
  };
};
