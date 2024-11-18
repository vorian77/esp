CREATE MIGRATION m1h6s37szmxoulytxmgsqqag7o5fuafluj5frnkyrpunpplldnaoca
    ONTO m15imp5a3dva4misjlc4boo6zqxowgv4oojswgfyse46seo3i4rhwa
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY isListSuppressFilterSearch {
          RENAME TO isListSuppressFilterSort;
      };
  };
};
