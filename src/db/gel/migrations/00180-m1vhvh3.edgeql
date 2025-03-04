CREATE MIGRATION m1vhvh364ju4ki74o7dauijqc5qxiqj7namvsgzydlhpjjatuaff3a
    ONTO m13x3gffoxuhpmbxpoex7yalaxzhbqpr27eg7ses67xqucbbad62ca
{
                              ALTER TYPE sys_core::SysDataObjAction {
      DROP LINK confirm;
  };
  DROP TYPE sys_core::SysDataObjActionConfirm;
};
