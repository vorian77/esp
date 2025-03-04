CREATE MIGRATION m1t2sag3arogp4wwvu4333zxwydwwq7ctuyhziogy4lsbfctgh77sa
    ONTO m1jd6xskrkhms5ubrgekucelee3i4e7zipxj4dutlly7cix74oiquq
{
          ALTER TYPE sys_core::SysDataObjFieldListItemsProp {
      CREATE REQUIRED PROPERTY isDisplayId: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
