import React, {useState, useRef} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import {Divider, Icon} from 'react-native-paper';

import ChevronUp from '../../theme/icons/chevron_up.png';
import ChevronDown from '../../theme/icons/chevron_down.png';

const Accordion = ({
  header,
  body,
  footer,
  toggelIcon,
  filter,
  borderWidth,
  divider,
  defaultExpanded,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded ? true : false);
  const accordion = useRef(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  borderWidth = footer || borderWidth ? 1 : 0;
  const paddingHorizontal = filter ? 0 : 15;

  return (
    <View style={[styles.container, {borderWidth}]}>
      <Pressable
        ref={accordion}
        style={[styles.header, {paddingHorizontal}]}
        onPress={toggleExpand}>
        {toggelIcon ? (
          <View style={styles.headerContent}>
            {header}
            <Icon source={expanded ? ChevronUp : ChevronDown} size={16} />
          </View>
        ) : (
          header
        )}
      </Pressable>

      {expanded && (
        <>
          {divider && (
            <View style={{marginBottom: 10}}>
              <Divider
              // style={{backgroundColor: colors.drawerDivider, height: 1}}
              />
            </View>
          )}
          <View style={[styles.body, , {paddingHorizontal}]}>{body}</View>

          {footer && (
            <>
              <Divider
              // style={{backgroundColor: colors.drawerDivider, height: 1}}
              />
              <View style={styles.footer}>{footer}</View>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});

export default Accordion;
