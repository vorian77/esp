CREATE MIGRATION m1uyrxrj4xwgpkxeroymee73ruobhuwofq5ndm4exlsj5xvvusalwa
    ONTO m1qwlba5efg6bj5goq7vwrwdtjxvwl3pbgvllv4vukybedpzled4ya
{
  ALTER TYPE app_cm::CmClient {
      CREATE LINK office: sys_core::SysObjSubject;
  };
  ALTER TYPE org_moed::MoedParticipant {
      ALTER LINK office {
          DROP OWNED;
          RESET TYPE;
      };
  };
};
