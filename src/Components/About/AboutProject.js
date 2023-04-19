import React from 'react';

function AboutProject() {
  return (
    <div className="about-scroll-container">
      <p>
        The Multineurophysiological (MNP) framework for deception detection is a
        project that aims to develop a tool for detecting deception using
        multiple neurophysiological modalities, including EEG
        (electroencephalography), ECG (electrocardiography), EOG
        (electrooculography), GSR (galvanic skin response), and eyetracking.
      </p>
      <p>
        The idea behind the MNP framework is that different modalities can
        provide complementary information about a person's psychological and
        physiological states, which can be used to infer deception. For example,
        changes in brain activity measured by EEG can provide information about
        cognitive processing and attention, while changes in heart rate measured
        by ECG can reflect emotional arousal.
      </p>
      <p>
        By combining these modalities, the MNP framework aims to increase the
        accuracy and reliability of deception detection. However, there are
        several challenges associated with this approach, including the need for
        sophisticated signal processing and machine learning algorithms to
        analyze and integrate the data from different modalities.
      </p>
      <p>
        Overall, the MNP framework has the potential to be a valuable tool for
        deception detection in a range of applications, including forensic
        investigations, security screening, and medical diagnosis. However,
        further research and development are needed to refine and validate
        the approach.
      </p>
    </div>
  );
}

export default AboutProject;
