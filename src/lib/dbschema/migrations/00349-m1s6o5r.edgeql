CREATE MIGRATION m1s6o5rv6v6hgpru5kbrjww24fmam3h3ssvxqltuiosfcq6v632agq
    ONTO m1os32v5zubl7kxw7ml2osqcoep7o64elhro2zecwz4szblgnqi7oq
{
  CREATE FUNCTION sys_core::getDataObjFieldListEdit(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldListEdit USING (SELECT
      sys_core::SysDataObjFieldListEdit
  FILTER
      (.name = name)
  );
};
