CREATE MIGRATION m1tcukeggiuegsng4e3ofkqb2o2onpsf7b7ydxzzhrvecilbl65wja
    ONTO m1gguzxbd2kgya5h6tzjmr3oh46kau6p7bs7lnccnjdsnynjznqoga
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY linkExprPreset: std::str;
  };
};
