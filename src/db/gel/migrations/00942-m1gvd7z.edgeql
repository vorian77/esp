CREATE MIGRATION m1gvd7zstty72epedsqoqomcjwj2euvoi7jo2vqj4m4za5psujhwoa
    ONTO m1u5ilh5rphhctqf5m5mxr6y23ukccsx2k675xttosutqcndqiinda
{
  ALTER TYPE app_cm::CmClient {
      ALTER TRIGGER cm_client_delete USING (DELETE
          default::SysPerson
      FILTER
          (.id NOT IN ((app_cm::CmClient.person.id UNION sys_core::SysObjEnt.contacts.id) UNION sys_user::SysUser.person.id))
      );
  };
};
