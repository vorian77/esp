CREATE MIGRATION m15imp5a3dva4misjlc4boo6zqxowgv4oojswgfyse46seo3i4rhwa
    ONTO m1yttvwphqkn52kpgd2tvxvv54so732b65kigdsyisv4lkrsex6qwa
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY isListHideSearch {
          RENAME TO isListSuppressFilterSearch;
      };
  };
};
