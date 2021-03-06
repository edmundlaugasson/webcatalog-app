/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import HelpIcon from '@material-ui/icons/Help';

import connectComponent from '../../helpers/connect-component';

import braveIcon from '../../assets/brave.png';
import chromeCanaryIcon from '../../assets/chrome-canary.png';
import chromeIcon from '../../assets/chrome.png';
import chromiumIcon from '../../assets/chromium.png';
import coccocIcon from '../../assets/coccoc.png';
import edgeIcon from '../../assets/edge.png';
import electronIcon from '../../assets/default-icon.png';
import firefoxIcon from '../../assets/firefox.png';
import operaIcon from '../../assets/opera.png';
import vivaldiIcon from '../../assets/vivaldi.png';
import webkitIcon from '../../assets/webkit.png';
import yandexIcon from '../../assets/yandex.png';

import HelpTooltip from './help-tooltip';

const CustomHelpIcon = withStyles(() => ({
  fontSizeSmall: {
    marginTop: 4,
  },
}))(HelpIcon);

const getDesc = (engineCode, browserName) => {
  if (engineCode === 'webkit') {
    return `This option creates lightweight ${browserName}-based app, optimized to save memory & battery.`;
  }

  if (engineCode === 'electron') {
    return `This option creates ${browserName}-based app with many exclusive features such as workspaces, notifications, badges and email handling. ${browserName} does not support WebExtensions and DRM-protected apps such as Netflix or Spotify.`;
  }

  const standardDesc = `This option creates bare-bone ${browserName}-based app${engineCode !== 'firefox' ? ' with WebExtension support' : ''}.`;
  const tabbedDesc = `This option creates ${browserName}-based app with traditional browser user interface, tab and WebExtension support.`;
  if (engineCode === 'opera') {
    return tabbedDesc;
  }

  return (
    <>
      <strong>Standard: </strong>
      {standardDesc}
      <br />
      <br />
      <strong>Tabbed: </strong>
      {tabbedDesc}
    </>
  );
};

const styles = () => ({
  disabledListItem: {
    opacity: '0.2',
    cursor: 'not-allowed',
  },
});

const EngineList = ({
  classes,
  engine,
  isMultisite,
  onEngineSelected,
  widevine,
}) => (
  <List dense>
    {widevine ? (
      <HelpTooltip
        title={(
          <Typography variant="body2" color="textPrimary">
            This app is incompatible with WebCatalog Engine.
          </Typography>
        )}
      >
        <ListItem
          button
          onClick={null}
          selected={engine === 'electron'}
          className={classnames(classes.disabledListItem)}
        >
          <ListItemAvatar>
            <Avatar alt="Electron" src={electronIcon} />
          </ListItemAvatar>
          <ListItemText
            primary={(
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="body2" noWrap>
                    WebCatalog Engine
                  </Typography>
                </Grid>
              </Grid>
            )}
          />
        </ListItem>
      </HelpTooltip>
    ) : (
      <ListItem
        button
        onClick={() => onEngineSelected('electron')}
        selected={engine === 'electron'}
      >
        <ListItemAvatar>
          <Avatar alt="Electron" src={electronIcon} />
        </ListItemAvatar>
        <ListItemText
          primary={(
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="body2" noWrap>
                  WebCatalog Engine
                </Typography>
              </Grid>
              <Grid item>
                <Chip size="small" label="Default" variant="outlined" />
              </Grid>
              <Grid item>
                <Chip size="small" label="Recommended" color="secondary" />
              </Grid>
              <Grid item>
                <HelpTooltip
                  title={(
                    <Typography variant="body2" color="textPrimary">
                      {getDesc('electron', 'WebCatalog Engine (Electron)')}
                    </Typography>
                  )}
                >
                  <CustomHelpIcon fontSize="small" color="disabled" />
                </HelpTooltip>
              </Grid>
            </Grid>
          )}
        />
      </ListItem>
    )}
    {window.process.platform === 'darwin' && (
      <>
        {isMultisite ? (
          <HelpTooltip
            title={(
              <Typography variant="body2" color="textPrimary">
                This app is incompatible with WebKit.
              </Typography>
            )}
          >
            <ListItem
              button
              onClick={() => null}
              selected={engine === 'webkit'}
              className={classnames(classes.disabledListItem)}
            >
              <ListItemAvatar>
                <Avatar alt="WebKit (part of Safari)" src={webkitIcon} />
              </ListItemAvatar>
              <ListItemText
                primary={(
                  <Grid container direction="row" alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography variant="body2" noWrap>
                        WebKit (part of Safari)
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip size="small" label="Experimental" variant="outlined" />
                    </Grid>
                    <Grid>
                      <HelpTooltip
                        title={(
                          <Typography variant="body2" color="textPrimary">
                            {getDesc('webkit', 'WebKit')}
                          </Typography>
                        )}
                      >
                        <CustomHelpIcon fontSize="small" color="disabled" />
                      </HelpTooltip>
                    </Grid>
                  </Grid>
                )}
              />
            </ListItem>
          </HelpTooltip>
        ) : (
          <ListItem
            button
            onClick={() => onEngineSelected('webkit')}
            selected={engine === 'webkit'}
          >
            <ListItemAvatar>
              <Avatar alt="WebKit (part of Safari)" src={webkitIcon} />
            </ListItemAvatar>
            <ListItemText
              primary={(
                <Grid container direction="row" alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography variant="body2" noWrap>
                      WebKit (part of Safari)
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Chip size="small" label="Experimental" variant="outlined" />
                  </Grid>
                  <Grid>
                    <HelpTooltip
                      title={(
                        <Typography variant="body2" color="textPrimary">
                          {getDesc('webkit', 'WebKit')}
                        </Typography>
                      )}
                    >
                      <CustomHelpIcon fontSize="small" color="disabled" />
                    </HelpTooltip>
                  </Grid>
                </Grid>
              )}
            />
          </ListItem>
        )}
      </>
    )}
    {window.process.platform !== 'linux' && (
      <ListItem
        button
        onClick={() => {
          if (engine === 'firefox' || engine.startsWith('firefox/')) return;
          onEngineSelected('firefox');
        }}
        selected={engine === 'firefox' || engine.startsWith('firefox/')}
      >
        <ListItemAvatar>
          <Avatar alt="Mozilla Firefox" src={firefoxIcon} />
        </ListItemAvatar>
        <ListItemText
          primary={(
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="body2" noWrap>
                  Mozilla Firefox
                </Typography>
              </Grid>
              <Grid item>
                <Chip size="small" label="Experimental" variant="outlined" />
              </Grid>
              <Grid item>
                <HelpTooltip
                  title={(
                    <Typography variant="body2" color="textPrimary">
                      {getDesc('firefox', 'Mozilla Firefox')}
                    </Typography>
                  )}
                >
                  <CustomHelpIcon fontSize="small" color="disabled" />
                </HelpTooltip>
              </Grid>
            </Grid>
          )}
        />
        {!isMultisite && (
          <ListItemSecondaryAction>
            <ToggleButtonGroup
              value={engine}
              exclusive
              onChange={(_, val) => {
                if (!val) return;
                onEngineSelected(val);
              }}
              size="small"
            >
              <ToggleButton value="firefox">
                Standard
              </ToggleButton>
              <ToggleButton value="firefox/tabs">
                Tabbed
              </ToggleButton>
            </ToggleButtonGroup>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    )}
    <ListItem
      button
      onClick={() => {
        if (engine === 'chrome' || engine.startsWith('chrome/')) return;
        onEngineSelected('chrome');
      }}
      selected={engine === 'chrome' || engine.startsWith('chrome/')}
    >
      <ListItemAvatar>
        <Avatar alt="Google Chrome" src={chromeIcon} />
      </ListItemAvatar>
      <ListItemText
        primary={(
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="body2" noWrap>
                Google Chrome
              </Typography>
            </Grid>
            <Grid item>
              <Chip size="small" label="Experimental" variant="outlined" />
            </Grid>
            <Grid item>
              <HelpTooltip
                title={(
                  <Typography variant="body2" color="textPrimary">
                    {getDesc('chrome', 'Google Chrome')}
                  </Typography>
                )}
              >
                <CustomHelpIcon fontSize="small" color="disabled" />
              </HelpTooltip>
            </Grid>
          </Grid>
        )}
      />
      {!isMultisite && (
        <ListItemSecondaryAction>
          <ToggleButtonGroup
            value={engine}
            exclusive
            onChange={(_, val) => {
              if (!val) return;
              onEngineSelected(val);
            }}
            size="small"
          >
            <ToggleButton value="chrome">
              Standard
            </ToggleButton>
            <ToggleButton value="chrome/tabs">
              Tabbed
            </ToggleButton>
          </ToggleButtonGroup>
        </ListItemSecondaryAction>
      )}
    </ListItem>
    <ListItem
      button
      onClick={() => {
        if (engine.startsWith('brave')) return;
        onEngineSelected('brave');
      }}
      selected={engine.startsWith('brave')}
    >
      <ListItemAvatar>
        <Avatar alt="Brave" src={braveIcon} />
      </ListItemAvatar>
      <ListItemText
        primary={(
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="body2" noWrap>
                Brave
              </Typography>
            </Grid>
            <Grid item>
              <Chip size="small" label="Experimental" variant="outlined" />
            </Grid>
            <Grid item>
              <HelpTooltip
                title={(
                  <Typography variant="body2" color="textPrimary">
                    {getDesc('brave', 'Brave')}
                  </Typography>
                )}
              >
                <CustomHelpIcon fontSize="small" color="disabled" />
              </HelpTooltip>
            </Grid>
          </Grid>
        )}
      />
      {!isMultisite && (
        <ListItemSecondaryAction>
          <ToggleButtonGroup
            value={engine}
            exclusive
            onChange={(_, val) => {
              if (!val) return;
              onEngineSelected(val);
            }}
            size="small"
          >
            <ToggleButton value="brave">
              Standard
            </ToggleButton>
            <ToggleButton value="brave/tabs">
              Tabbed
            </ToggleButton>
          </ToggleButtonGroup>
        </ListItemSecondaryAction>
      )}
    </ListItem>
    {window.process.platform === 'darwin' && (
      <ListItem
        button
        onClick={() => {
          if (engine.startsWith('chromeCanary')) return;
          onEngineSelected('chromeCanary');
        }}
        selected={engine.startsWith('chromeCanary')}
      >
        <ListItemAvatar>
          <Avatar alt="Google Chrome Canary" src={chromeCanaryIcon} />
        </ListItemAvatar>
        <ListItemText
          primary={(
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="body2" noWrap>
                  Google Chrome Canary
                </Typography>
              </Grid>
              <Grid item>
                <Chip size="small" label="Experimental" variant="outlined" />
              </Grid>
              <Grid item>
                <HelpTooltip
                  title={(
                    <Typography variant="body2" color="textPrimary">
                      {getDesc('chromeCanary', 'Google Chrome Canary')}
                    </Typography>
                  )}
                >
                  <CustomHelpIcon fontSize="small" color="disabled" />
                </HelpTooltip>
              </Grid>
            </Grid>
          )}
        />
        {!isMultisite && (
          <ListItemSecondaryAction>
            <ToggleButtonGroup
              value={engine}
              exclusive
              onChange={(_, val) => {
                if (!val) return;
                onEngineSelected(val);
              }}
              size="small"
            >
              <ToggleButton value="chromeCanary">
                Standard
              </ToggleButton>
              <ToggleButton value="chromeCanary/tabs">
                Tabbed
              </ToggleButton>
            </ToggleButtonGroup>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    )}
    {window.process.platform !== 'win32' && (
      <ListItem
        button
        onClick={() => {
          if (engine.startsWith('chromium')) return;
          onEngineSelected('chromium');
        }}
        selected={engine.startsWith('chromium')}
      >
        <ListItemAvatar>
          <Avatar alt="Chromium" src={chromiumIcon} />
        </ListItemAvatar>
        <ListItemText
          primary={(
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="body2" noWrap>
                  Chromium
                </Typography>
              </Grid>
              <Grid item>
                <Chip size="small" label="Experimental" variant="outlined" />
              </Grid>
              <Grid item>
                <HelpTooltip
                  title={(
                    <Typography variant="body2" color="textPrimary">
                      {getDesc('chromium', 'Chromium')}
                    </Typography>
                  )}
                >
                  <CustomHelpIcon fontSize="small" color="disabled" />
                </HelpTooltip>
              </Grid>
            </Grid>
          )}
        />
        {!isMultisite && (
          <ListItemSecondaryAction>
            <ToggleButtonGroup
              value={engine}
              exclusive
              onChange={(_, val) => {
                if (!val) return;
                onEngineSelected(val);
              }}
              size="small"
            >
              <ToggleButton value="chromium">
                Standard
              </ToggleButton>
              <ToggleButton value="chromium/tabs">
                Tabbed
              </ToggleButton>
            </ToggleButtonGroup>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    )}
    {window.process.platform !== 'linux' && (
      <ListItem
        button
        onClick={() => {
          if (engine.startsWith('coccoc')) return;
          onEngineSelected('coccoc');
        }}
        selected={engine.startsWith('coccoc')}
      >
        <ListItemAvatar>
          <Avatar alt="Cốc Cốc" src={coccocIcon} />
        </ListItemAvatar>
        <ListItemText
          primary={(
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="body2" noWrap>
                  Cốc Cốc
                </Typography>
              </Grid>
              <Grid item>
                <Chip size="small" label="Experimental" variant="outlined" />
              </Grid>
              <Grid item>
                <HelpTooltip
                  title={(
                    <Typography variant="body2" color="textPrimary">
                      {getDesc('coccoc', 'Cốc Cốc')}
                    </Typography>
                  )}
                >
                  <CustomHelpIcon fontSize="small" color="disabled" />
                </HelpTooltip>
              </Grid>
            </Grid>
          )}
        />
        {!isMultisite && (
          <ListItemSecondaryAction>
            <ToggleButtonGroup
              value={engine}
              exclusive
              onChange={(_, val) => {
                if (!val) return;
                onEngineSelected(val);
              }}
              size="small"
            >
              <ToggleButton value="coccoc">
                Standard
              </ToggleButton>
              <ToggleButton value="coccoc/tabs">
                Tabbed
              </ToggleButton>
            </ToggleButtonGroup>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    )}
    {window.process.platform !== 'linux' && (
      <ListItem
        button
        onClick={() => {
          if (engine.startsWith('edge')) return;
          onEngineSelected('edge');
        }}
        selected={engine.startsWith('edge')}
      >
        <ListItemAvatar>
          <Avatar alt="Microsoft Edge" src={edgeIcon} />
        </ListItemAvatar>
        <ListItemText
          primary={(
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="body2" noWrap>
                  Microsoft Edge
                </Typography>
              </Grid>
              <Grid item>
                <Chip size="small" label="Experimental" variant="outlined" />
              </Grid>
              <Grid item>
                <HelpTooltip
                  title={(
                    <Typography variant="body2" color="textPrimary">
                      {getDesc('edge', 'Microsoft Edge')}
                    </Typography>
                  )}
                >
                  <CustomHelpIcon fontSize="small" color="disabled" />
                </HelpTooltip>
              </Grid>
            </Grid>
          )}
        />
        {!isMultisite && (
          <ListItemSecondaryAction>
            <ToggleButtonGroup
              value={engine}
              exclusive
              onChange={(_, val) => {
                if (!val) return;
                onEngineSelected(val);
              }}
              size="small"
            >
              <ToggleButton value="edge">
                Standard
              </ToggleButton>
              <ToggleButton value="edge/tabs">
                Tabbed
              </ToggleButton>
            </ToggleButtonGroup>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    )}
    <ListItem
      button
      onClick={() => onEngineSelected('opera/tabs')}
      selected={engine === 'opera/tabs'}
    >
      <ListItemAvatar>
        <Avatar alt="Opera" src={operaIcon} />
      </ListItemAvatar>
      <ListItemText
        primary={(
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="body2" noWrap>
                Opera
              </Typography>
            </Grid>
            <Grid item>
              <Chip size="small" label="Experimental" variant="outlined" />
            </Grid>
            <Grid item>
              <HelpTooltip
                title={(
                  <Typography variant="body2" color="textPrimary">
                    {getDesc('opera', 'Opera')}
                  </Typography>
                )}
              >
                <CustomHelpIcon fontSize="small" color="disabled" />
              </HelpTooltip>
            </Grid>
          </Grid>
        )}
      />
      {!isMultisite && (
        <ListItemSecondaryAction>
          <ToggleButtonGroup
            value={engine}
            exclusive
            onChange={(_, val) => {
              if (!val) return;
              onEngineSelected(val);
            }}
            size="small"
          >
            <ToggleButton value="opera/tabs">
              Tabbed
            </ToggleButton>
          </ToggleButtonGroup>
        </ListItemSecondaryAction>
      )}
    </ListItem>
    <ListItem
      button
      onClick={() => {
        if (engine.startsWith('vivaldi')) return;
        onEngineSelected('vivaldi');
      }}
      selected={engine.startsWith('vivaldi')}
    >
      <ListItemAvatar>
        <Avatar alt="Vivaldi" src={vivaldiIcon} />
      </ListItemAvatar>
      <ListItemText
        primary={(
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="body2" noWrap>
                Vivaldi
              </Typography>
            </Grid>
            <Grid item>
              <Chip size="small" label="Experimental" variant="outlined" />
            </Grid>
            <Grid item>
              <HelpTooltip
                title={(
                  <Typography variant="body2" color="textPrimary">
                    {getDesc('vivaldi', 'Vivaldi')}
                  </Typography>
                )}
              >
                <CustomHelpIcon fontSize="small" color="disabled" />
              </HelpTooltip>
            </Grid>
          </Grid>
        )}
      />
      {!isMultisite && (
        <ListItemSecondaryAction>
          <ToggleButtonGroup
            value={engine}
            exclusive
            onChange={(_, val) => {
              if (!val) return;
              onEngineSelected(val);
            }}
            size="small"
          >
            <ToggleButton value="vivaldi">
              Standard
            </ToggleButton>
            <ToggleButton value="vivaldi/tabs">
              Tabbed
            </ToggleButton>
          </ToggleButtonGroup>
        </ListItemSecondaryAction>
      )}
    </ListItem>
    <ListItem
      button
      onClick={() => {
        if (engine.startsWith('yandex')) return;
        onEngineSelected('yandex');
      }}
      selected={engine.startsWith('yandex')}
    >
      <ListItemAvatar>
        <Avatar alt="Yandex" src={yandexIcon} />
      </ListItemAvatar>
      <ListItemText
        primary={(
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="body2" noWrap>
                Yandex Browser
              </Typography>
            </Grid>
            <Grid item>
              <Chip size="small" label="Experimental" variant="outlined" />
            </Grid>
            <Grid item>
              <HelpTooltip
                title={(
                  <Typography variant="body2" color="textPrimary">
                    {getDesc('yandex', 'Yandex Browser')}
                  </Typography>
                )}
              >
                <CustomHelpIcon fontSize="small" color="disabled" />
              </HelpTooltip>
            </Grid>
          </Grid>
        )}
      />
      {!isMultisite && (
        <ListItemSecondaryAction>
          <ToggleButtonGroup
            value={engine}
            exclusive
            onChange={(_, val) => {
              if (!val) return;
              onEngineSelected(val);
            }}
            size="small"
          >
            <ToggleButton value="yandex">
              Standard
            </ToggleButton>
            <ToggleButton value="yandex/tabs">
              Tabbed
            </ToggleButton>
          </ToggleButtonGroup>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  </List>
);

EngineList.defaultProps = {
  engine: '',
  isMultisite: false,
  widevine: false,
};

EngineList.propTypes = {
  classes: PropTypes.object.isRequired,
  engine: PropTypes.string,
  isMultisite: PropTypes.bool,
  onEngineSelected: PropTypes.func.isRequired,
  widevine: PropTypes.bool,
};

export default connectComponent(
  EngineList,
  null,
  null,
  styles,
);
