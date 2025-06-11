CREATE MIGRATION m1ujcq73v2tfottgs4wvwdpiemyuts2m4t2rzhiflucip67pbgrfha
    ONTO m17njsfukdfuz27cmgzzg6kqgfdfmkqsioc3ixtubcfej2iqjjzoja
{
  ALTER TYPE sys_core::SysCode {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCode('ct_sys_obj_attr_type', 'at_sys_code'));
      };
  };
};
