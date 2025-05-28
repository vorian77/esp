CREATE MIGRATION m1t7lxr53grqetwdfglini535hdbk4yyzfq5wowrvdqlhqz3zp4g2q
    ONTO m1xftr5lmuag5mefk6i4yipooou44n5vqb3tp6wrdfi3h52arso4rq
{
  ALTER FUNCTION sys_core::getObjAttrType(ownerName: std::str, name: std::str) {
      RENAME TO sys_core::getObjAttr;
  };
};
