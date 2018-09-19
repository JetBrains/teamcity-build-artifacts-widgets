import React from 'react';
import PropTypes from 'prop-types';

import Link from '@jetbrains/ring-ui/components/link/link';
import EmptyWidget, {EmptyWidgetFaces} from '@jetbrains/hub-widget-ui/dist/empty-widget';
import {i18n} from 'hub-dashboard-addons/dist/localization';

import styles from './app.css';

function WidgetContent({children, testKey}) {
  return (
    <div className={styles.widget} data-test={testKey}>
      {children}
    </div>
  );
}

WidgetContent.propTypes = {
  testKey: PropTypes.string,
  children: PropTypes.node
};

const Content = (
  {
    teamcityService,
    buildType,
    artifacts,
    artifactsLoadErrorMessage,
    onConfigure
  }
) => {
  if (!teamcityService || !buildType) {
    return (
      <WidgetContent testKey={'widget-setup-pending'}>
        <span>
          {i18n('Widget setup is not finished yet.')}
          <span>{' '}</span>
          <Link onClick={onConfigure}>{i18n('Set up...')}</Link>
        </span>
      </WidgetContent>
    );
  } else if (artifactsLoadErrorMessage) {
    return (
      <WidgetContent testKey={'widget-load-error'}>
        <EmptyWidget face={EmptyWidgetFaces.ERROR}>
          {i18n('Cannot load build statuses')}
          <br/>
          {artifactsLoadErrorMessage}
        </EmptyWidget>
      </WidgetContent>
    );
  } else if (!artifacts.length) {
    return (
      <WidgetContent testKey={'widget-no-builds'}>
        <EmptyWidget face={EmptyWidgetFaces.HAPPY}>{i18n('No failed builds')}</EmptyWidget>
      </WidgetContent>
    );
  } else {
    return (
      <WidgetContent testKey={'widget-build-list'}>
        {JSON.stringify(artifacts)}
      </WidgetContent>
    );
  }
};

Content.propTypes = {
  teamcityService: PropTypes.object,
  buildType: PropTypes.object,
  artifacts: PropTypes.array.isRequired,
  artifactsLoadErrorMessage: PropTypes.string,
  onConfigure: PropTypes.func.isRequired
};

export default Content;
