import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Icon } from 'expo';

export default class ButtonLogo extends Component {
  renderIcon = () => {
    var iconRender = null;
    switch (this.props.iconType) {
      case 'Entypo':
        iconRender = (
          <Icon.Entypo
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        );
        break;
      case 'Octicons':
        iconRender = (
          <Icon.Octicons
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        );
        break;
      case 'FontAwesome':
        iconRender = (
          <Icon.FontAwesome
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        );
        break;
      case 'MaterialCommunityIcons':
        iconRender = (
          <Icon.MaterialCommunityIcons
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        );
        break;
      case 'SimpleLineIcons':
        iconRender = (
          <Icon.SimpleLineIcons
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        );
        break;
      case 'MaterialIcons':
        iconRender = (
          <Icon.MaterialIcons
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        );
        break;
      case 'Feather':
        iconRender = (
          <Icon.Feather
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        );
        break;
      case 'EvilIcons':
        iconRender = (
          <Icon.EvilIcons
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        );
        break;
      case 'Foundation':
        iconRender = (
          <Icon.oundation
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        );
        break;
      default:
        iconRender = (
          <Icon.Ionicons
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor}
          />
        );
        break;
    }
    return iconRender;
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        style={[
          {
            backgroundColor: this.props.color,
            width: this.props.width,
            height: Platform.OS === 'ios' && this.props.height < 45 ? 45 : this.props.height,
            marginVertical: this.props.marginVertical
          },
          this.props.shadow && styles.shadowBox,
          this.props.buttonBorder ? styles.buttonBorder : styles.default
        ]}
        accessibilityLabel={this.props.accessibilityLabel}
      >
        {this.props.icon !== undefined ? (
          this.props.loading ? (
            <ActivityIndicator color={this.props.iconColor} />
          ) : (
            this.renderIcon()
          )
        ) : this.props.loading ? (
          <ActivityIndicator color="white" />
        ) : (
          undefined
        )}
        <Text
          style={[
            { color: this.props.colorText },
            this.props.icon != undefined && styles.separator,
            this.props.loading && styles.separator
          ]}
        >
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    elevation: 1
  },
  separator: {
    left: 8
  },
  default: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2
  },
  buttonBorder: {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabled: {
    opacity: 0.5
  }
});
