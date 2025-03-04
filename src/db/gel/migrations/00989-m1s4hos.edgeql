CREATE MIGRATION m1s4hoslvzuj3db4w3qzmbehtkq6cpdtklihj75d3yn5ovsvaiflgq
    ONTO m12jbsrvrhibz6q3ziggeq4qgysiomoqqj3zgzxrfgw4d22l5xif5q
{
  DROP FUNCTION sys_core::attrAdd(objOwnerName: std::str, objName: std::str, attrOwnerName: std::str, attrName: std::str, attrHasAccess: std::bool);
};
